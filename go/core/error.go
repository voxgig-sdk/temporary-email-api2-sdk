package core

type TemporaryEmailApi2Error struct {
	IsTemporaryEmailApi2Error bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewTemporaryEmailApi2Error(code string, msg string, ctx *Context) *TemporaryEmailApi2Error {
	return &TemporaryEmailApi2Error{
		IsTemporaryEmailApi2Error: true,
		Sdk:              "TemporaryEmailApi2",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *TemporaryEmailApi2Error) Error() string {
	return e.Msg
}
