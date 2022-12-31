import swell from "swell-js"
swell.init(process.env.NEXT_PUBLIC_SWELL_STORE as string, process.env.NEXT_PUBLIC_SWELL_API_TOKEN as string)

export default swell
