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
        <SectionHeader title="Unique dApp development tool">
          <Text className="m-auto" style={{ maxWidth: '800px' }}>
            We're kind of scratching our own itch here. As developers, we spend
            a lot of time communicating with teammates and stakeholders, while
            developing our smart contracts, preparing for a TGE event or daily
            operations.
          </Text>
          <Text className="m-auto" style={{ maxWidth: '800px' }}>
            No one's to blame, but sharing wallet's memo or keys with developers
            is a bad practice, lack of documentation and modern UI tooling for
            junior developers makes entry threshold high, both for guys with
            ideas and guys with ability to write code.
          </Text>
        </SectionHeader>
      </Section>

      <Section background="white">
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
        <img src={useBaseUrl('outpost/OPWhy1_1.png')} alt="OP why" />
      </Section>

      <Section>
        <SectionHeader title="Some features" />
        <OPFeatureList />
      </Section>

      <Section background="white">
        <SectionHeader title="Outp0st Payload anatomy - heart of the tool">
          {/* <Text className="m-auto" style={{ maxWidth: '800px' }}>
            Documentation speaks to your users. Ideally, this conversation will
            be pleasant and efficient. Everyone visiting your documentation page
            has a different need: Some are exploring your product, some are
            trying to get started, and some are stuck and need help.
          </Text>
          <Text className="m-auto" style={{ maxWidth: '800px' }}>
            DocSearch is designed to provide relevant search results at every
            level. Its structured layout give the users more context to
            understand the product.
          </Text> */}
        </SectionHeader>
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

      {/* <Section id="live">
        <SectionHeader title="Try it live">
          <Text>
            We helped integrate DocSearch into several open source projects. Try
            it live.
          </Text>
        </SectionHeader>
        <CardsGrid columnsPerRow={demoProjects.length}>
          {demoProjects.map(({ name, href, logo, preview }) => (
            <Card
              key={name}
              image={preview}
              imageProps={{ alt: `${name} demo` }}
            >
              <LightCta withArrow href={href} rel="noreferrer" target="_blank">
                <img
                  style={{
                    marginTop: '-2px',
                    marginRight: '12px',
                  }}
                  className={'h-30 va-middle'}
                  src={useBaseUrl(logo)}
                  alt={name}
                />
                Visit {name}
              </LightCta>
            </Card>
          ))}
        </CardsGrid>
      </Section> */}

      {/* <Section>
        <SectionHeader title="Join the DocSearch program">
          <Text>
            We’ll get back to you with everything you need to integrate your new
            search into your website.
          </Text>
          <Text>Oh, and did we mention it's FREE?</Text>
          <Text>No commitment. No subscription. Everything is on us!</Text>
        </SectionHeader>

        <ApplyForm />
      </Section> */}
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
