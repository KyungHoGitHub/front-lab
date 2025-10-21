import notFoundPageImg from '@assets/notFoundPage.png';

const NotFoundPage = () =>{

    return(
        <div className="flex items-center justify-center h-screen bg-black">
            <img
                src={notFoundPageImg}
                alt="Not found"
                className="w-[50vw] max-w-[900px] object-contain"
            />
        </div>
    )
}
export default  NotFoundPage;