// Chakra imports
import {Avatar, Box, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React from "react";

export default function Banner(props) {
    const {id, banner, avatar, name, job, department, score} = props;
    // Chakra Color Mode
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "gray.400";
    const borderColor = useColorModeValue(
        "white !important",
        "#111C44 !important"
    );
    return (
        <Card mb={{base: "0px", lg: "20px"}} align='center'>
            <Box
                bg={`url(${banner})`}
                bgSize='cover'
                borderRadius='16px'
                h='13px'
                w='100%'
            />
            <Avatar
                mx='auto'
                src={avatar}
                h='87px'
                w='87px'
                mt='-43px'
                border='4px solid'
                borderColor={borderColor}
            />
            <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
                {name}
            </Text>
            <Text color={textColorSecondary} fontSize='sm'>
                {job}
            </Text>
            <Flex w='max-content' mx='auto' mt='26px' direction='column'>
                <Flex mx='auto' me='60px' align='left' direction='row'>
                    <Text color={textColorPrimary} fontSize='sm' fontWeight='700' width='200px' align='left'>
                        Employee ID
                    </Text>
                    <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
                        {id}
                    </Text>
                </Flex>
                <Flex mx='auto' me='60px' align='left' direction='row'>
                    <Text color={textColorPrimary} fontSize='sm' fontWeight='700' width='200px' align='left' flex-shrink={0}>
                        Department
                    </Text>
                    <Text color={textColorSecondary} fontSize='sm' fontWeight='400' flex={1}>
                        {department}
                    </Text>
                </Flex>
                <Flex mx='auto' me='60px' align='left' direction='row'>
                    <Text color={textColorPrimary} fontSize='sm' fontWeight='700' width='200px' align='left'>
                        Score
                    </Text>
                    <Text color={textColorSecondary} fontSize='sm' fontWeight='400' flex={1}>
                        {score}
                    </Text>
                </Flex>
            </Flex>
        </Card>
    );
}
