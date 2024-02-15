import { Avatar, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React from "react";

export default function Banner(props) {
    const { id, banner, avatar, name, job, department, retention_score } = props;
    // Chakra Color Mode
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "gray.400";
    const borderColor = useColorModeValue("white !important", "#111C44 !important");

    return (
        <Card mb={{ base: "0px", lg: "20px" }} align="center">
            <Box bg={`url(${banner})`} bgSize="cover" borderRadius="16px" h="13px" w="100%" />
            <Avatar mx="auto" src={avatar} h="87px" w="87px" mt="-43px" border="4px solid" borderColor={borderColor} />
            <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px">
                {name}
            </Text>
            <Text color={textColorSecondary} fontSize="sm">
                {job}
            </Text>
            <Flex direction="column" w="100%" minW="300px" mx="auto" mt="26px">
                {[
                    { label: "Employee ID", value: id },
                    { label: "Department", value: department },
                    { label: "Retention Score", value: retention_score },
                ].map(({ label, value }, index) => (
                    <Flex key={index} justify="space-between" align="center" w="100%">
                        <Text color={textColorPrimary} fontSize="sm" fontWeight="700">
                            {label}
                        </Text>
                        <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
                            {value}
                        </Text>
                    </Flex>
                ))}
            </Flex>
        </Card>
    );
}
