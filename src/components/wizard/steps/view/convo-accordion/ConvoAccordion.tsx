import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

interface Props {
   heading: any;
   content: any
}

interface State {

}

class ConvoAccordion extends React.Component<Props, State> {
    render() {
        const {heading, content} = this.props;
        return (
            <Accordion allowMultipleExpanded={true} allowZeroExpanded={true}>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            {heading}
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        {content}
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>
        );
    }
}

export default ConvoAccordion;
