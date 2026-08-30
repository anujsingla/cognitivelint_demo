import { Title, Text, List, ListItem, CodeBlock, CodeBlockCode } from '@patternfly/react-core';

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
        <ListItem>Built-in rules across 6 categories</ListItem>
        <ListItem>Cognitive score</ListItem>
      </List>
    </>
  );
}
