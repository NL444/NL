//by NL

//Comando pra mudar tema de chat (esse comando muda o tema pra todos verem).

case 'cleart':
case 'tema': {
if (!isGroup) return reply('*ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏ́ ꜰᴜɴᴄɪᴏɴᴀ ᴇᴍ ɢʀᴜᴘᴏ.*');
if (!isGroupAdmins && !isDono) return reply('*sᴏᴍᴇɴᴛᴇ ᴅᴏɴᴏ/ᴀᴅᴍ ᴘᴏᴅᴇ ᴜsᴀʀ ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ.*');
try {
const { Writer } = require('protobufjs/minimal');
const img = isImage ? info.message.imageMessage : isQuotedImage ? quoted.imageMessage : null;
const t = Writer.create().uint32(8).int64(Date.now());
const temas = 'WhatsApp-Green Pearl-Indigo Tyrian-Purple Sunset-Orange Merino-Teal Royal-Blue Dark-Cerulean Charcoal-Green Persian-Plum Dune-Mono Default-Blue Default-Mono Sky-Blue Brown Cream Emerald Lemon Lime Pink Red Sunrise-Orange Warm-Yellow'.split(' ');
const id = temas.find((x) => [x, x.split('-').pop()].some((y) => y.toLowerCase() === q.toLowerCase()));
if (cmd === 'cleart' || q === 'cleart') {
t.uint32(16).bool(true);
} else if (id) {
t.uint32(26).string(id)/*BY NL*/.uint32(82).fork().uint32(8).bool(true).ldelim(); //BY NL
} else if (img) {
baileys.MEDIA_PATH_MAP['chat-wallpaper-image'] = '/mms/chat-wallpaper-image';
baileys.MEDIA_HKDF_KEY_MAPPING['chat-wallpaper-image'] = 'Chat Wallpaper';
const enc = await baileys.encryptedStream(await getFileBuffer(img, 'image'), 'chat-wallpaper-image'); //BY NL
const up = await ozz.waUploadToServer(enc.encFilePath, { fileEncSha256B64: enc.fileEncSha256.toString('base64'), mediaType: 'chat-wallpaper-image' });
fs.unlinkSync(enc.encFilePath);
t.uint32(106).fork().uint32(10).string(up.directPath).uint32(18).bytes(enc.mediaKey).uint32(26).bytes(enc.fileEncSha256).uint32(34).bytes(enc.fileSha256).ldelim(); //BY NL
} else {
return reply(`*ᴜsᴏ:* ${prefix}tema ᴍᴀʀᴄᴀɴᴅᴏ ᴜᴍᴀ ғᴏᴛᴏ | ${prefix}tema red | ${prefix}cleart\n*ᴛᴇᴍᴀs:* ${temas.join(', ').toLowerCase()}`);
}
await ozz.sendMessage(from, { react: { text: '⏳', key: info.key } });
const msg = Writer.create().uint32(98).fork().uint32(16).int32(34)/*BY NL*/.uint32(242).bytes(t.finish()).ldelim().finish();
const { me } = ozz.authState.creds, modo = groupMetadata?.addressingMode || 'lid';
const { ciphertext } = await ozz.signalRepository.encryptGroupMessage({ group: from, data: baileys.writeRandomPadMax16(msg), meId: modo === 'lid' && me.lid ? me.lid : me.id }); //BY NL
await ozz.sendNode({ tag: 'message', attrs: { id: baileys.generateMessageIDV2(me.id), to: from, type: 'media', addressing_mode: modo }, content: [{ tag: 'enc', attrs: { v: '2', type: 'skmsg', mediatype: 'chat_theme' }, content: ciphertext }] }); //BY NL
await react('✅');
} catch (e) {
console.log(e);
reply('*ᴇʀʀᴏ ᴀᴏ ᴍᴜᴅᴀʀ ᴏ ᴛᴇᴍᴀ.*');
}
break;
}
