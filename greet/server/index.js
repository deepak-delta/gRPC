const grpc = require('@grpc/grpc-js')
const serviceImpl = require('./service_impl.js')
const { GreetServiceService } = require('../proto/greet_grpc_pb.js')

const addr = 'localhost:50051'

const cleanup = (server) => {
  console.log('Cleanup')
  if (server) {
    server.forceShutdown()
  }
}

function main() {
  const server = new grpc.Server()
  const creds = grpc.ServerCredentials.createInsecure()

  process.on('SIGINT', () => {
    console.log('Caught interrupt signal')
    cleanup(server)
  })

  server.addService(GreetServiceService, serviceImpl)
  server.bindAsync(addr, creds, (err, _) => {
    if (err) {
      return cleanup(server)
    }

    server.start()
  })
  console.log('Server started, listening on %s', addr)
}

main()
