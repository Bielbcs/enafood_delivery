const RETURNED_USER_MOCK = {
  _id: "640b95ee21f754b7f9c52c0f",
  username: "test",
  email: "email@teste.com"
};

const RETURN_PASSWORD = {
  _id: "640b97af0c993040044d9f16",
  password: 'e10adc3949ba59abbe56e057f20f883e'
}

const INSERTED_USER_MOCK = {
  username: "teste",
  email: "Jon Doe",
  password: "123456"
}

const MOCKED_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJfaWQiOiI2NDBiOTdhZjBjOTkzMDQwMDQ0ZDlmMTYiLCJpYXQiOjE2Nzg0ODQ1OTAsImV4cCI6MTY3ODU3MDk5MH0
.t3D-14S_PgVW37rYTDA2dstW1veBHVmoEYcS30IIbdY`

module.exports = { RETURNED_USER_MOCK, INSERTED_USER_MOCK, RETURN_PASSWORD, MOCKED_TOKEN }