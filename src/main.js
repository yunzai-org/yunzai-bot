import { createLogin, Client, Processor, Loader } from 'yunzai'

const initialize = () => {
  Processor.install()
  Loader.load()
}
const start = async () => {
  await createLogin()
  const T = await Client.run()
  if (T) {
    Bot.on('system.online', initialize)
  } else {
    initialize()
  }
}
setTimeout(start, 0)
