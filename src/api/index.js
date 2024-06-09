import axios from "axios"

// Função para extrair o ID do vídeo a partir da URL
export function extractVideoId(urlStr) {
    try {
        const url = new URL(urlStr);
        const hostname = url.hostname;
        const pathname = url.pathname;
        const searchParams = url.searchParams;

        if (hostname === 'youtu.be') {
            return pathname.substring(1);
        }
        if (hostname === 'www.youtube.com' || hostname === 'youtube.com') {
            if (searchParams.has('v')) {
                return searchParams.get('v');
            } else if (pathname.startsWith('/watch')) {
                const pathnameParts = pathname.split('/');
                return pathnameParts[pathnameParts.length - 1];
            }
        }
        return null;
    } catch (e) {
        console.error('URL Inválida', e);
        return null;
    }
}

// Função para obter dados do vídeo usando a API do YouTube
export async function getVideoDetails(videoId, apiKey) {
try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
    params: {
        part: 'snippet,statistics, contentDetails',
        id: videoId,
        key: apiKey,
    }
    });
    return response.data;
} catch (error) {
    console.error('Erro ao obter detalhes do vídeo:', error.message);
    return null;
}
}

export function convertDuration(duration) {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
    const matches = duration.match(regex);
    const hours = matches[1] ? parseInt(matches[1]) : 0;
    const minutes = matches[2] ? parseInt(matches[2]) : 0;

    return `${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm' : ''}`;
}

export function formatViews(input) {
    let value = input;
    value = value.replace(/\D/g, '');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return value;
}


