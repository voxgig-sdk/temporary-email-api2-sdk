<?php
declare(strict_types=1);

// EmailInbox entity test

require_once __DIR__ . '/../temporaryemailapi2_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class EmailInboxEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = TemporaryEmailApi2SDK::test(null, null);
        $ent = $testsdk->EmailInbox(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = email_inbox_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "email_inbox." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set TEMPORARY_EMAIL_API2_TEST_EMAIL_INBOX_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $email_inbox_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.email_inbox")));
        $email_inbox_ref01_data = null;
        if (count($email_inbox_ref01_data_raw) > 0) {
            $email_inbox_ref01_data = Helpers::to_map($email_inbox_ref01_data_raw[0][1]);
        }

        // LOAD
        $email_inbox_ref01_ent = $client->EmailInbox(null);
        $email_inbox_ref01_match_dt0 = [
            "id" => $email_inbox_ref01_data["id"],
        ];
        $email_inbox_ref01_data_dt0_loaded = $email_inbox_ref01_ent->load($email_inbox_ref01_match_dt0, null);
        $email_inbox_ref01_data_dt0_load_result = Helpers::to_map(is_object($email_inbox_ref01_data_dt0_loaded) && method_exists($email_inbox_ref01_data_dt0_loaded, 'data_get') ? $email_inbox_ref01_data_dt0_loaded->data_get() : $email_inbox_ref01_data_dt0_loaded);
        $this->assertNotNull($email_inbox_ref01_data_dt0_load_result);
        $this->assertEquals($email_inbox_ref01_data_dt0_load_result["id"], $email_inbox_ref01_data["id"]);

    }
}

function email_inbox_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/email_inbox/EmailInboxTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = TemporaryEmailApi2SDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["email_inbox01", "email_inbox02", "email_inbox03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("TEMPORARY_EMAIL_API2_TEST_EMAIL_INBOX_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "TEMPORARY_EMAIL_API2_TEST_EMAIL_INBOX_ENTID" => $idmap,
        "TEMPORARY_EMAIL_API2_TEST_LIVE" => "FALSE",
        "TEMPORARY_EMAIL_API2_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["TEMPORARY_EMAIL_API2_TEST_EMAIL_INBOX_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["TEMPORARY_EMAIL_API2_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new TemporaryEmailApi2SDK(Helpers::to_map($merged_opts));
    }

    $live = $env["TEMPORARY_EMAIL_API2_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["TEMPORARY_EMAIL_API2_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
