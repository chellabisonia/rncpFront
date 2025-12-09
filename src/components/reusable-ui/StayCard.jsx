import styled from "styled-components";


export default function StayCard({ image, title, city, price }) {
    return (
        <Card>
            <Image src={image} alt={title} />
            <Content>
                <Title>{title}</Title>
                <Location>{city}</Location>
                <Price>{price}€/nuit</Price>
            </Content>
        </Card>
    );
}

const Card = styled.div`
  width: 260px;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 170px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 12px 14px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

const Location = styled.p`
  font-size: 14px;
  color: #666;
  margin: 6px 0 0 0;
`;

const Price = styled.span`
  font-size: 15px;
  color: #1a73e8;
  font-weight: 600;
`;

