import { Title, Text, List, ListItem, CodeBlock, CodeBlockCode, Label } from '@patternfly/react-core';

export function HomePage() {
  return (
    <>
      <Title headingLevel="h1" size="2xl">
        Conference demo — intentional human bugs
      </Title>
      <Text component="p">
        This PatternFly app deliberately violates CognitiveLint rules so you can run a live scan
        during your talk. Each sidebar section maps to a cognitive UX category.
      </Text>
      <div style={{ marginTop: '0.75rem' }}>
        <Label color="orange">Expected scan: ~22 findings</Label>{' '}
        <Label color="blue">Typical score: 87 (B)</Label>
      </div>

      <Title headingLevel="h2" size="lg" style={{ marginTop: '1.5rem' }}>
        Run the scan
      </Title>
      <CodeBlock>
        <CodeBlockCode>
          {`cd cognitivelint_demo
pnpm install
pnpm scan
`}
        </CodeBlockCode>
      </CodeBlock>

      <Title headingLevel="h2" size="lg" style={{ marginTop: '1.5rem' }}>
        What to expect
      </Title>
      <List>
        <ListItem>17 built-in rules across 6 categories</ListItem>
        <ListItem>Low cognitive score (typically B range)</ListItem>
        <ListItem>Findings tied to real PatternFly components</ListItem>
        <ListItem>Some PatternFly props (e.g. isDisabled) may not trigger — great talking point</ListItem>
      </List>
    </>
  );
}
