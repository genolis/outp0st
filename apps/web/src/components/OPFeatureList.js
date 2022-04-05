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
        carouselVideo="/outpost/demo_op_token.mp4"
        imageProps={{
          alt: 'yolo',
        }}
      >
        <TextBlock title="Secure your Mainnet deployment">
          <Text>
            Using terra station as a base we can ensure, that noone will know
            mainnet deployment wallets credentials except of you.
          </Text>
          <LightCta
            target="_blank"
            href="https://app.outp0st.io/outpost?state=https://dweb.link/ipfs/bafybeiejn6axqpboolnlngxkgmvzevcgxngrydmvgm6fqhilyq6ikecnwi/outpost.Rover_generated_6:32:12_PM.1.0.0.1649090170210.json#TOK"
          >
            Checkout how you can deploy cw20 token on mainnet
          </LightCta>
        </TextBlock>
      </Card>
      <Card
        carouselImage="/outpost/OPDocs.png"
        imageProps={{
          alt: 'yolo',
        }}
      >
        <TextBlock title="Document your contracts like a pro">
          <Text>
            You can document contract and it's messages using markdown inside
            Outp0st/Payload(UI) module!
          </Text>
          <LightCta href="#">
            Check documented example of vesting contract
          </LightCta>
        </TextBlock>
      </Card>
      <Card
        carouselVideo="/outpost/demo_op_share.mp4"
        imageProps={{
          alt: 'yolo',
        }}
      >
        <TextBlock title="Share your work with teammates">
          <Text>
            Make your contract work, document it and share your awesome code
            with other teammates! Or, you can link it, right in your Github repo
          </Text>
          {/* <LightCta href="#">Che</LightCta> */}
        </TextBlock>
      </Card>
    </FeaturesCarousel>
  );
}
