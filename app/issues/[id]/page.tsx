import React from "react";
import prisma from "@/prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Heading, Text, Card, Flex, Box, Grid, Button } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Pencil2Icon } from "@radix-ui/react-icons";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap="3" my="2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="mt-4">{issue.description}</Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
