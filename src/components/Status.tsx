// Union String Literals for conditionally rendering a status msg
export type StatusProp = {
    status: 'loading' | 'success' | 'error';
}

const Status: React.FC = () => {

    const statusInput: StatusProp = {
        status: 'error' // Change this to 'success' or 'error' to see different messages
    }

    let message
    if(statusInput.status === 'loading') {
        message = 'Loading...';
    } else if (statusInput.status === 'error') {
        message = 'Error occurred';
    } else if (statusInput.status === 'success') {
        message = 'Data fetched successfully';
    }


    return (
        <div>
            <h1>Status Message:</h1>
            <p>{message}</p>
        </div>
    );
}

export default Status;