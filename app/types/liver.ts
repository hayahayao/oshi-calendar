export interface Liver {
  readonly slug: string
  readonly name: string
  readonly enName: string
  readonly avatar: string
  readonly color: {
    main: string // color2
    highlight: string // color1
  }
  readonly socialLinks: {
    twitter: string
    youtube: string
    twitch: string
  }
}
