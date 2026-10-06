// two languages, one dictionary — strings plus a few interpolators.
// language is fixed once at startup (cli.tsx), so plain module state is enough.
export type Lang = 'en' | 'zh'

const en = {
  help: `
  yoinks — yoink any video. paste. yoink. done.

  Usage
    $ yoinks [url]

  Examples
    $ yoinks https://youtu.be/dQw4w9WgXcQ
    $ yoinks https://x.com/user/status/123456
    $ yoinks                 (prompts for a url)

  Options
    --theme <mode>  use auto, light, or dark for this run
    --lang <lang>   use en or zh for this run
    -h, --help      show this help
    -v, --version   show version

  Downloads are saved to ~/Downloads.
  Powered by yt-dlp — YouTube, X, Instagram, Threads, TikTok & 1800+ sites.
`,
  yoinkButton: 'yoink',
  doneLabel: '↵ yoink another',
  tagline: 'yoink any video. paste. yoink. done.',
  moreSites: '+1800 more',
  pasteLink: 'Paste a link',
  notALink: 'that doesn’t look like a link — paste a full url',
  clipboardLink: 'link in your clipboard — ⇥ to paste it',
  fromClipboard: 'from your clipboard — ↵ to yoink it',
  warming: 'warming up…',
  fetchingInfo: 'fetching video info…',
  downloadPanel: 'Download',
  hintYoink: 'yoink',
  hintQuit: 'quit',
  hintCancel: 'cancel',
  hintChoose: 'choose',
  hintBack: 'back',
  hintRetry: 'try again',
  hintHistory: 'history',
  hintTheme: 'theme:',
  processing: ' processing…',
  downloading: ' downloading…',
  startingDownload: ' starting download…',
  linkExpired: ' link expired — grabbing a fresh one…',
  yoinked: '✓ yoinked! ',
  findFileIn: 'find your file in:',
  part: (part: number, total: number) => `part ${part}/${total}  `,
  etaLeft: (eta: string) => `${eta} left`,
  finalOutput: (filepath: string) => `✓ yoinked → ${filepath}`,
  fetchYtdlp: 'first run: fetching yt-dlp…',
  ytdlpDownloadFailed: (status: string | number) =>
    `Could not download yt-dlp (${status}). Check your connection and try again.`,
  parseInfoFailed: 'Could not parse video info from yt-dlp.',
  cancelled: 'Download cancelled.',
  downloadFailed: (code: string | number) => `Download failed (yt-dlp exit code ${code}).`,
  bestAvail: 'best available · mp4',
  audioOnly: 'audio only · mp3',
}

const zh: typeof en = {
  help: `
  yoinks — 粘贴链接，一键下载，完事。

  用法
    $ yoinks [链接]

  示例
    $ yoinks https://youtu.be/dQw4w9WgXcQ
    $ yoinks https://x.com/user/status/123456
    $ yoinks                 （提示输入链接）

  选项
    --theme <mode>  本次运行使用 auto / light / dark 主题
    --lang <lang>   本次运行使用 en 或 zh 界面语言
    -h, --help      显示帮助
    -v, --version   显示版本

  下载的文件保存在 ~/Downloads。
  基于 yt-dlp — 支持 YouTube、X、Instagram、Threads、TikTok 等 1800+ 网站。
`,
  yoinkButton: '下载',
  doneLabel: '↵ 再来一个',
  tagline: '粘贴链接，一键下载，完事。',
  moreSites: '等 1800+ 个网站',
  pasteLink: '粘贴链接',
  notALink: '这看起来不是链接——请粘贴完整网址',
  clipboardLink: '剪贴板里有链接——按 ⇥ 填入',
  fromClipboard: '来自剪贴板——按 ↵ 下载',
  warming: '准备中…',
  fetchingInfo: '获取视频信息…',
  downloadPanel: '下载',
  hintYoink: '下载',
  hintQuit: '退出',
  hintCancel: '取消',
  hintChoose: '选择',
  hintBack: '返回',
  hintRetry: '重试',
  hintHistory: '历史',
  hintTheme: '主题:',
  processing: ' 处理中…',
  downloading: ' 下载中…',
  startingDownload: ' 开始下载…',
  linkExpired: ' 链接过期——重新获取…',
  yoinked: '✓ 下载完成！',
  findFileIn: '文件保存在：',
  part: (part: number, total: number) => `第 ${part}/${total} 段  `,
  etaLeft: (eta: string) => `${eta} 后完成`,
  finalOutput: (filepath: string) => `✓ 已下载 → ${filepath}`,
  fetchYtdlp: '首次运行：下载 yt-dlp…',
  ytdlpDownloadFailed: (status: string | number) =>
    `下载 yt-dlp 失败（${status}）。请检查网络连接后重试。`,
  parseInfoFailed: '解析视频信息失败。',
  cancelled: '已取消下载。',
  downloadFailed: (code: string | number) => `下载失败（yt-dlp 退出码 ${code}）。`,
  bestAvail: '最佳画质 · mp4',
  audioOnly: '仅音频 · mp3',
}

const dicts: Record<Lang, typeof en> = {en, zh}

// default: follow the terminal locale — zh_* envs start in chinese
let lang: Lang = process.env.LANG?.toLowerCase().startsWith('zh') ? 'zh' : 'en'

export type TKey = keyof typeof en

export const isLang = (value: string): value is Lang => value === 'en' || value === 'zh'
export const setLang = (value: Lang) => {
  lang = value
}

export const t = (key: TKey, ...args: unknown[]): string => {
  const value = dicts[lang][key]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return typeof value === 'function' ? (value as (...a: any[]) => string)(...args) : value
}
