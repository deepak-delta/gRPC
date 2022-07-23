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

const doGreetManyTimes = (client) => {
  console.log('doGreetManyTimes was called')
  const req = new GreetRequest().setFirstname('John')
  const call = client.greetManyTimes(req)

  call.on('data', (res) => {
    console.log(`GreetManyTimes: ${res.getResult()}`)
  })
}

const doLongGreet = (client) => {
  console.log('doLongGreet was called')
  const names = ['John', 'Jane', 'Mary', 'Bob', 'Tom']
  const call = client.longGreet((err, res) => {
    if (err) {
      console.log(err)
      return
    }
    console.log(`LongGreet ${res.getResult()}`)
  })

  names
    .map((name) => {
      return new GreetRequest().setFirstname(name)
    })
    .forEach((req) => call.write(req))
  call.end()
}

function main() {
  const creds = grpc.ChannelCredentials.createInsecure()
  const client = new GreetServiceClient('localhost:50051', creds)

  //doGreet(client)
  //doGreetManyTimes(client)
  doLongGreet(client)
  client.close()
}

main()
