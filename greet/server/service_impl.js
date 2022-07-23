const { GreetResponse } = require('../proto/greet_pb.js')

exports.greet = (call, callback) => {
  console.log('Greet was called')
  //   const req = call.request
  const res = new GreetResponse().setResult(
    `Hello ${call.request.getFirstname()}`
  )
  callback(null, res)
}

exports.greetManyTimes = (call, _) => {
  console.log('GreetManyTimes was invoked')
  const res = new GreetResponse()

  for (let i = 0; i < 10; ++i) {
    res.setResult(`Hello ${call.request.getFirstname()} - number ${i}`)
    call.write(res)
  }

  call.end()
}
