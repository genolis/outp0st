import {
  Button,
  Hero,
  Section,
  SectionHeader,
  Text,
  TextBlock,
  TextBlocksGrid,
} from '@algolia/ui-library';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React from 'react';
import { OPFeatureList } from '../components/OPFeatureList';
import { Outp0stLogo } from '../components/Outp0stLogo';

function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <>
      <Hero
        id="hero"
        background="orbInside"
        title={<Outp0stLogo width="50%" />}
        subtitle={siteConfig.tagline}
        cta={[
          <Button
            primary
            style={{ textDecoration: 'none' }}
            href={useBaseUrl('/docs/quickstart')}
          >
            Go to quickstart!
          </Button>,
        ]}
      />

      <Section>
        <SectionHeader title="Unique dApp development tool"></SectionHeader>
      </Section>

      <Section background="white" style={{ textAlign: 'center' }}>
        <SectionHeader title="Why?">
          <Text className="m-auto" style={{ maxWidth: '800px' }}>
            First of all - security concerns, we wanted a robust tools for
            making Mainnet deployments as easy as possibile for stakeholders
          </Text>
          <Text className="m-auto" style={{ maxWidth: '800px' }}>
            And second - communication, we wanted a 'single source of truth'
            solution for deployments, documentation and interaction with each
            other on blockchain specific themes
          </Text>
        </SectionHeader>
        <img
          className="m-auto"
          src={useBaseUrl('outpost/OPWhy2.png')}
          alt="OP why"
        />
      </Section>

      <Section>
        <SectionHeader title="Some features" />
        <OPFeatureList />
      </Section>

      <Section background="white">
        <SectionHeader title="Outp0st Payload anatomy - heart of the tool"></SectionHeader>
        <img
          src={useBaseUrl('outpost/OPWindow.png')}
          alt="Anatomy of Payload"
        />
      </Section>

      <Section background="white" id="how-it-works">
        <SectionHeader title="How it works" />
        <TextBlocksGrid numbered columnsPerRow={3}>
          <TextBlock title="Contract to UI" label="Config">
            <Text>
              Get the contract, it may be contract address, code id, compiled
              wasm binary or sources. In case of source, you can use Rover - CLI
              tool to generate Payload UI for futher adjustments. In other
              cases, just head to{' '}
              <a href="https://app.outp0st.io" target={'_blank'}>
                Payload UI
              </a>{' '}
              add a tab via '+' and start using
            </Text>
          </TextBlock>
          <TextBlock title="Adjust your contracts and messages" label="Adjust">
            <Text>
              Modify your contracts, your messages, use it to test in localterra
              or testnet, copy your messages and contracts between environments,
              document it, share it.
            </Text>
          </TextBlock>
          <TextBlock title="Mainnet deployment" label="Deploy">
            <Text>
              Development, testing, documenting complete? You can now relax, and
              deploy everything on mainnet!
            </Text>
          </TextBlock>
        </TextBlocksGrid>
      </Section>
    </>
  );
}

function HomePage() {
  return (
    <Layout
      title="Home"
      description="Modern Terra dApp development experience for teams"
    >
      <Home />
    </Layout>
  );
}

export default HomePage;
