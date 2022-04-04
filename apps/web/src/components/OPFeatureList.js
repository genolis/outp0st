import {
  Card,
  FeaturesCarousel,
  LightCta,
  Text,
  TextBlock,
} from '@algolia/ui-library';
import React from 'react';

export function OPFeatureList() {
  return (
    <FeaturesCarousel>
      <Card
        carouselImage="https://res.cloudinary.com/hilnmyskv/image/upload/v1601910581/Algolia_com_Website_assets/images/dynamic-search-re-ranking/increase.jpg"
        imageProps={{
          alt: 'yolo',
        }}
      >
        <TextBlock title="Secure your Mainnet deployment">
          <Text>
            Using terra station as a base we can ensure, that noone will know
            mainnet deployment wallets credentials except of you.
          </Text>
          <LightCta href="#">
            Checkout how you can deploy cw20 token on mainnet
          </LightCta>
        </TextBlock>
      </Card>
      <Card
        carouselImage="https://res.cloudinary.com/hilnmyskv/image/upload/v1601910581/Algolia_com_Website_assets/images/dynamic-search-re-ranking/increase.jpg"
        imageProps={{
          alt: 'yolo',
        }}
      >
        <TextBlock title="This is a title, oh yes">
          <Text>
            This is some text oh yes This is some text oh yes This is some text
            oh yes This is some text oh yes
          </Text>
          <LightCta href="#">This is some text</LightCta>
        </TextBlock>
      </Card>
      <Card
        carouselImage="https://res.cloudinary.com/hilnmyskv/image/upload/v1601910581/Algolia_com_Website_assets/images/dynamic-search-re-ranking/increase.jpg"
        imageProps={{
          alt: 'yolo',
        }}
      >
        <TextBlock title="This is a title, oh yes">
          <Text>
            This is some text oh yes This is some text oh yes This is some text
            oh yes This is some text oh yes
          </Text>
          <LightCta href="#">This is some text</LightCta>
        </TextBlock>
      </Card>
    </FeaturesCarousel>
  );
}
