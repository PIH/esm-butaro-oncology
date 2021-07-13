import { openmrsFetch } from '@openmrs/esm-framework';



async function getEncounters(query){

    const searchResults = await openmrsFetch('/ws/rest/v1/encounter?q=4864c8ee-26fe-102b-80cb-0017a47871b2',{
        method: 'GET',
    });
    const data = await searchResults.json();
    // console.log("------------------" + data);
    return data;
}

export default getEncounters;