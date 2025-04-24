import { Fragment, useRef, useEffect, useState} from "react"
import {Container, ContainerFirst, BackgroundImg, Video, List, Description} from "./styles"
import { FaPlus, FaTrash, FaSearch } from 'react-icons/fa'
import VideoPlayer from "../../player/Player"
import {convertDuration, formatViews, getVideoDetails, getUpdatedViews, extractVideoId} from "../../api"

export function Home(){

    const apiKey = import.meta.env.VITE_API_KEY
    const [list, setList] = useState([])
    const [videoUrl, setVideoUrl] = useState("")
    const [videoDetails, setVideoDetails] = useState(null)
    const containerRef = useRef(null);
    const listElement = document.getElementsByClassName("list")

    useEffect(() => {
        const videosData = localStorage.getItem("@playervideo:data");
        if (videosData) {
            const listData = JSON.parse(videosData);
            setList(listData);
            if(listData.length > 0)
                setVideoDetails({ id: listData[0].id, title: listData[0].title, views: listData[0].views });
        }
    }, []);

   useEffect(() => {
        if(list.length === 1)
            setVideoDetails({ id: list[0].id, title: list[0].title, views: list[0].views });
    }, [list]);

    // Extrai o ID do vídeo da URL
    function getClick(){
        const videoId = extractVideoId(videoUrl);
        if (videoId) {
            const ids = list.map(item => item.id)
            const check = ids.filter(id => id === videoId)
            
            if(check.length == 1){
                alert("Vídeo já está na sua playlist!")
                setVideoUrl("")
            }else{
                // Obtenha os detalhes do vídeo
                getVideoDetails(videoId, apiKey)
                    .then(videoDetails => {
                    if (videoDetails && videoDetails.items.length > 0) {
                        const snippet = videoDetails.items[0].snippet;
                        const statistics = videoDetails.items[0].statistics;
                        const contentDetails = videoDetails.items[0].contentDetails;
                        
                        const video = {
                            title: snippet.title,
                            duration: convertDuration(contentDetails.duration),
                            views: statistics.viewCount,
                            id: videoDetails.items[0].id
                        }

                        const videoString = JSON.stringify([...list, video])
                        localStorage.setItem("@playervideo:data", videoString)
                        setList(
                            [
                                ...list,
                                {
                                    title: snippet.title,
                                    duration: convertDuration(contentDetails.duration),
                                    views: formatViews(statistics.viewCount),
                                    id: videoDetails.items[0].id
                                }
                            ]
                        )
                        setVideoUrl("")
                    } else {
                        alert("Vídeo não encontrado ou detalhes indisponíveis.");
                    }
                });
            }
        } else {
            alert("URL do vídeo do YouTube inválida.");
        }

    }

    async function selectVideo(id, title){
        const updatedViews = await getUpdatedViews(id, apiKey);
    
        const updatedList = list.map(item => 
            item.id === id ? { ...item, views: updatedViews } : item
        );
    
        setList(updatedList);
        localStorage.setItem("@playervideo:data", JSON.stringify(updatedList));
    
        setVideoDetails({ id, title, views: updatedViews });
    }
    
    function deletedVideo(videoId, index){
        if(confirm("Deseja excluir esse vídeo da lista?")){
            const newList = list.filter(item => item.id !== videoId)
            setList(newList)
            const listData = JSON.stringify(newList)
            localStorage.setItem("@playervideo:data", listData)
            
            if(newList.length <= 0)
                setVideoDetails({})
            else if(videoId === videoDetails.id && index != 0 )
                setVideoDetails({id: newList[index-1].id, title: newList[index-1].title, views: newList[index-1].views})
            else if(videoId === videoDetails.id && index === 0 )
                setVideoDetails({id: newList[0].id, title: newList[0].title, views: newList[0].views})
        }
    }

    function searchPress(evento){
        if(evento.key === "Enter")
            getClick()
    }

    if(list.length == 0){
        return(
            <ContainerFirst>
                <BackgroundImg/>
                <div>
                    <input type="search" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} 
                        placeholder="Coloque uma url do youtube para começar sua playlist" onKeyDown={e => searchPress(e)}/>
                    <button onClick={getClick}><FaSearch/></button>
                </div>
            </ContainerFirst>
        )
    }else{
        return(
            <Fragment>
                <Container>
                    <Video ref={containerRef}>
                        <VideoPlayer key={videoDetails?.id} videoId={videoDetails?.id} containerRef={containerRef} list={listElement}/>
                    </Video>

                    <List className="list">
                        <ul>
                            {
                                list.map((video, index) => (
                                    <li  
                                        key={video.id} 
                                        onClick={() => selectVideo(video.id, video.title)}>
                                        <p>{video.title}</p>
                                        <span>{video.duration}
                                            <span className="deleted" onClick={(e) => {
                                                e.stopPropagation()
                                                deletedVideo(video.id, index)}
                                            }><FaTrash/></span>
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
    
                        <div>
                            <input type="search" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} 
                                   placeholder="Adicione outro vídeo a sua playlist" onKeyDown={e => searchPress(e)}/>
                            <button onClick={getClick}><FaPlus color="DimGray"/></button>
                        </div>
                    </List>
    
                    <Description>
                        <h1>Descrição</h1>
                        <div>
                            <p>{videoDetails?.title}</p>
                            <p>Visualizações: {videoDetails?.views}</p>
                        </div>
                    </Description>
                </Container>
    
            </Fragment>
        )

    }

}