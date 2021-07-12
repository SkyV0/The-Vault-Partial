import UserSetPrice from './UserSetPrice.js'
import {AccountItemCluster} from "./account-item-cluster.comp"
import{
    Button,
    Center,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Text,
    useDisclosure,
} from "@chakra-ui/react"

export function PriceModal(){
    const { isOpen, onOpen, onClose } = useDisclosure();

    return(
        <div>
          <Button onClick={onOpen} colorScheme="blue" size="sm">
            <HStack>
            {AccountItemCluster.BUSY && <Spinner mr="2" size="xs" />}{" "}
                <Text>List NFT For Sale</Text>
            </HStack>
          </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader><Center>Set the Price for your NFT</Center></ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <UserSetPrice />
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose} disabled={AccountItemCluster.BUSY}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>
    )
}

export default PriceModal;