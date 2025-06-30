import './ImageBlock.css';

interface ImageBlockProps{
    src: string;
    alt?: string;
    width?: string;
    height?: string;
}

const ImageBlock: React.FC<ImageBlockProps> = ({src,alt,width,height})=>{

    return(
        <div className="image-block" style={{width, height}}>
            <img
                className="image-block__img"
                src={src}
                alt={alt}
                onError={(e) => {
                    (e.target as HTMLImageElement).src = "/fallback.png"; // 실패 시 대체 이미지
                }}
            />
        </div>
    )
}
export default ImageBlock;