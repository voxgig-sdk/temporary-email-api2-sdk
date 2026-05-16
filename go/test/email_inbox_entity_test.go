package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/temporary-email-api2-sdk"
	"github.com/voxgig-sdk/temporary-email-api2-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestEmailInboxEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.EmailInbox(nil)
		if ent == nil {
			t.Fatal("expected non-nil EmailInboxEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := email_inboxBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "email_inbox." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set TEMPORARYEMAILAPI__TEST_EMAIL_INBOX_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		emailInboxRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.email_inbox", setup.data)))
		var emailInboxRef01Data map[string]any
		if len(emailInboxRef01DataRaw) > 0 {
			emailInboxRef01Data = core.ToMapAny(emailInboxRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = emailInboxRef01Data

		// LOAD
		emailInboxRef01Ent := client.EmailInbox(nil)
		emailInboxRef01MatchDt0 := map[string]any{}
		emailInboxRef01DataDt0Loaded, err := emailInboxRef01Ent.Load(emailInboxRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if emailInboxRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func email_inboxBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "email_inbox", "EmailInboxTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read email_inbox test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse email_inbox test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"email_inbox01", "email_inbox02", "email_inbox03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("TEMPORARYEMAILAPI__TEST_EMAIL_INBOX_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"TEMPORARYEMAILAPI__TEST_EMAIL_INBOX_ENTID": idmap,
		"TEMPORARYEMAILAPI__TEST_LIVE":      "FALSE",
		"TEMPORARYEMAILAPI__TEST_EXPLAIN":   "FALSE",
		"TEMPORARYEMAILAPI__APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["TEMPORARYEMAILAPI__TEST_EMAIL_INBOX_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["TEMPORARYEMAILAPI__TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["TEMPORARYEMAILAPI__APIKEY"],
			},
			extra,
		})
		client = sdk.NewTemporaryEmailApi2SDK(core.ToMapAny(mergedOpts))
	}

	live := env["TEMPORARYEMAILAPI__TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["TEMPORARYEMAILAPI__TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
