import { createLogin, Client, Processor, Loader } from 'yunzai'
setTimeout(async () => {
  await createLogin()
  await Client.run().then(async () => {
    await Processor.install()
    await Loader.load()
  })
}, 0)
