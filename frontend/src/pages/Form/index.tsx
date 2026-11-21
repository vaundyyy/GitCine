import FormCard from 'components/FormCard';
import { useParams } from 'react-router-dom';
import './styles.css';

function Form() {
    const params = useParams();

    return (
        <main className="gitcine-form-page">
            <div className="container">
                <FormCard movieId={`${params.movieId}`}/>
            </div>
        </main>
    );
}

export default Form;