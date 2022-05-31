const pb = require('../proto/greet_pb.js')

exports.greet = (call, callback) => {
  console.log('Greet was called')
  //   const req = call.request
  const res = new pb.GreetResponse().setResult(
    `Hello ${call.request.getFirstname()}`
  )
  callback(null, res)
}
