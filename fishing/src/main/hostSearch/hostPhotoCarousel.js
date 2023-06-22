import Carousel from 'react-bootstrap/Carousel';

function HostPhotoCarousel() {
  return (
    <Carousel slide={false}>
      <Carousel.Item style={{width:"400px", height:"250px"}}>
        <img
          className="d-block w-100"
          src="https://cdn.pixabay.com/photo/2023/06/15/16/51/finch-8066014__340.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{width:"400px", height:"250px"}}>
        <img
          className="d-block w-100"
          src="https://cdn.pixabay.com/photo/2023/06/12/11/34/mushrooms-8058299__340.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{width:"400px", height:"250px"}}>
        <img
          className="d-block w-100"
          src="https://cdn.pixabay.com/photo/2023/03/27/18/06/bird-7881393_640.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HostPhotoCarousel;