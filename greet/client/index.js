const grpc = require('@grpc/grpc-js')
const { GreetServiceClient } = require('../proto/greet_grpc_pb.js')
const { GreetRequest } = require('../proto/greet_pb.js')

const doGreet = (client) => {
  console.log('doGreet was called')
  const req = new GreetRequest().setFirstname('John')
  client.greet(req, (err, res) => {
    if (err) {
      console.log(err)
      return
    }
    console.log(res.getResult())
  })
}

function main() {
  const creds = grpc.ChannelCredentials.createInsecure()
  const client = new GreetServiceClient('localhost:50051', creds)

  doGreet(client)
  client.close()
}

main()
