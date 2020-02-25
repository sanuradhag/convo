class RestAPI {

    private static baseUrl = 'http://localhost:5000';

    public static fetchInteractionModel(): Promise<any> {
        const url = `${this.baseUrl}/api/v1/interaction-model`;
        let headers = new Headers();
        headers.append("Accept", "application/json");
        const options = {
            method: 'GET',
            mode: "cors",
            headers: headers
        };
        return fetch(url, options as any)
            .then(res => res.json())
            .catch(err => console.log(err));
    }

    public static uploadSpecFile(file: File | Blob): Promise<any> {
        const url = `${this.baseUrl}/api/v1/file-upload`;
        const formData = new FormData();
        formData.append('file', file);
        const options = {
            method: 'POST',
            body: formData,
        };
        return fetch(url, options)
            .then(res => res.json())
            .catch(err => console.log(err));
    }

}

export default RestAPI;
