package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "TemporaryEmailApi2",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://kingtmp.email",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"email_generation": map[string]any{},
				"email_inbox": map[string]any{},
			},
		},
		"entity": map[string]any{
			"email_generation": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "email",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "expires_at",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "token",
						"req": false,
						"type": "`$STRING`",
						"index$": 2,
					},
				},
				"name": "email_generation",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/generate",
								"parts": []any{
									"api",
									"generate",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"email_inbox": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "messages",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "total",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 1,
					},
				},
				"name": "email_inbox",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "temp_user_12345@kingtmp.email",
											"kind": "param",
											"name": "id",
											"orig": "email",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/inbox/{email}",
								"parts": []any{
									"api",
									"inbox",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"email": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
