export interface InteractionModel {
    languageModel: LanguageModel;
    dialog?: Dialog;
    prompts?:Prompt;
}

interface LanguageModel {
    invocationName: string;
    intents: LanguageModelIntent[];
    types?: Type[];
}

interface LanguageModelIntent {
    name: string;
    slots?: Slot[];
    samples?: any[];
}

interface Slot {
    name: string;
    type: string;
    samples?: any[]
}

interface Type {
    name: string;
    values?: TypeValueCatalog[];
    valueSupplier?: CatalogValueSupplier;
}

interface TypeValueCatalog {
    type: string
}

interface CatalogValueSupplier {
    valueCatalog: ValueCatalog;
}

interface ValueCatalog {
    catalogId: string;
    version: string;
}

interface Value {
    id:string;
    name: ValueName
}

interface ValueName {
    value: string
}

interface ValueSynonym {
    value: string;
    synonyms: any[]
}

/*
  Dialog
 */
interface Dialog {
    intents: DialogIntent[];
    delegationStrategy?: string;
}

interface DialogIntent {
    name: string;
    delegationStrategy?: string;
    slots: DialogSlots[];
    confirmationRequired: boolean;
    prompts: DialogIntentPrompt[]
}

interface DialogIntentPrompt {
    confirmation?: string;
}

interface DialogSlots {
    name: string;
    type: string;
    elicitationRequired?: boolean;
    confirmationRequired?: boolean;
    prompts?: DialogSlotPrompt[];
    validations?: DialogSlotValidation[]
}

interface DialogSlotValidation {
    type: string;
    prompt:string
}

interface DialogSlotPrompt {
    elicitation?: string;
    confirmation?: string;
}


/*
  Prompts
 */

interface Prompt {
    id: string;
    variations: Variation[]
}

interface Variation {
    type: string;
    value: string
}
