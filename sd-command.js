//by NL

//Comando pra criar figurinhas de até 20 segundos com som.

case 'sd': {
const m = info.message;
const own = m.imageMessage || m.videoMessage;
const vis = own || quoted?.videoMessage;
const qa = own?.contextInfo?.quotedMessage?.audioMessage;
const vid = vis?.mimetype?.startsWith('video');
if (!vis || (!vid && !qa)) return reply(`*ᴍᴀʀǫᴜᴇ ᴜᴍ ᴠɪ́ᴅᴇᴏ ᴄᴏᴍ sᴏᴍ, ᴏᴜ ᴇɴᴠɪᴇ ɪᴍᴀɢᴇᴍ/ᴠɪ́ᴅᴇᴏ ᴄᴏᴍ ᴀ ʟᴇɢᴇɴᴅᴀ ${prefix}saudio ʀᴇsᴘᴏɴᴅᴇɴᴅᴏ ᴜᴍ ᴀ́ᴜᴅɪᴏ.*`);
reply('*ꜰɪɢᴜʀɪɴʜᴀ ᴄᴏᴍ sᴏᴍ sᴇɴᴅᴏ ᴄʀɪᴀᴅᴀ, ᴀɢᴜᴀʀᴅᴇ...*');
const d = path.join(os.tmpdir(), `sa${Date.now()}`);
const [v, a, w, o, b] = ['v', 'a', 'webp', 'ogg', 'best.webp'].map((e) => `${d}.${e}`);
try {
react("🩸");
const { Writer } = require('protobufjs/minimal');
const run = require('util').promisify(require('child_process').execFile);
const T = '20';
fs.writeFileSync(v, await getFileBuffer(vis, vid ? 'video' : 'image'));
if (qa) fs.writeFileSync(a, await getFileBuffer(qa, 'audio'));
const cr = (await run('ffmpeg', ['-i', v, '-t', T, '-vf', 'cropdetect=24:2:0', '-f', 'null', '-'])).stderr.match(/crop=\S+/g)?.pop();
await run('ffmpeg', ['-y', '-v', 'error', '-i', qa ? a : v, '-t', T, '-vn', '-c:a', 'libopus', '-b:a', '32k', '-vbr', 'on', '-compression_level', '10', '-frame_duration', '20', '-avoid_negative_ts', 'make_zero', '-f', 'ogg', o]);
const enc = async (fp, q) => { //BY NL
await run('ffmpeg', ['-y', '-v', 'error', '-i', v, '-t', T, '-vf', `${cr ? cr + ',' : ''}fps=${fp},scale=512:512,setsar=1`, '-c:v', 'libwebp', '-compression_level', '2', '-loop', '0', '-q:v', `${q}`, '-an', w]);
return fs.statSync(w).size < 1e6 && !fs.copyFileSync(w, b);
};
let ok;
const t = Date.now(); //BY NL
for (const fp of [15, 12, 10, 8, 5]) {
if (fp == 15) {
if (await enc(fp, 50)) {
ok = 1;
break;
}
reply(`*ꜰɪɢᴜʀɪɴʜᴀ ᴘᴇsᴀᴅᴀ, ᴠᴀɪ ᴅᴇᴍᴏʀᴀʀ ᴜɴs ${Math.round(((Date.now() - t) / 1000) * 6)} sᴇɢᴜɴᴅᴏs.*`);
}
if (!(await enc(fp, 0))) continue;
ok = 1;
for (let lo = 0, hi = 50; hi - lo > 2;) { //BY NL
const mid = (lo + hi) >> 1;
(await enc(fp, mid)) ? (lo = mid) : (hi = mid);
}
break;
}
if (!ok) return reply(`*ꜰɪɢᴜʀɪɴʜᴀ ᴘᴇsᴀᴅᴀ ᴅᴇᴍᴀɪs, ᴜsᴇ ᴜᴍ ᴠɪ́ᴅᴇᴏ ᴍᴀɪs ᴄᴜʀᴛᴏ ᴏᴜ sɪᴍᴘʟᴇs.*`);
const st = new Sticker(); //BY NL
st.file = b;
await st.exif({ pack: botName, author: pushname, emojis: ['🩸'] });
const sec = Math.round((await run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', o])).stdout);
const up = (c) => prepareWAMessageMedia(c, { upload: ozz.waUploadToServer }); //BY NL
const { stickerMessage: sk } = await up({ sticker: fs.readFileSync(b) });
const { audioMessage: au } = await up({ audio: fs.readFileSync(o), mimetype: 'audio/ogg; codecs=opus', seconds: sec });
const P = baileys.proto.Message;
const W = (t, b) => Writer.create().uint32(t).bytes(b).finish();
const ci = { stanzaId: info.key.id, participant: info.key.participant || info.key.remoteJid, quotedMessage: m, expiration: groupMetadata?.ephemeralDuration };
const S = Buffer.concat([P.StickerMessage.encode({ ...sk, isAnimated: vid, width: 512, height: 512, stickerSentTs: Date.now(), contextInfo: ci }).finish(), W(210, P.AudioMessage.encode(au).finish())]); //BY NL
if (!P.encode.sa) {
const e = P.encode;
P.encode = (x, y) => { const r = e(x, y); return x?.sa ? r.uint32(1074).bytes(x.sa) : r; };
P.encode.sa = 1;
}
await ozz.relayMessage(from, { sa: W(10, W(210, S)) }, {}); //BY NL
} catch (e) {
console.log(e);
reply(`*ᴇʀʀᴏ ᴀᴏ ᴄʀɪᴀʀ ᴀ ꜰɪɢᴜʀɪɴʜᴀ ᴄᴏᴍ sᴏᴍ (ᴏ ᴠɪ́ᴅᴇᴏ ᴘʀᴇᴄɪsᴀ ᴛᴇʀ ᴀ́ᴜᴅɪᴏ).*`);
} finally {
[v, a, w, o, b].forEach((f) => fs.rmSync(f, { force: true }));
}
break;
}