import yt from "ytdl-core";

export async function getVideoInfo(url: string): Promise<yt.videoInfo> {
	const videoId: string = url.split("watch?v=")[1];

	const info = await yt.getInfo(videoId);

	return info;
}
