export default function Result({result, singular, plural}){

    return (
        <p className='card__date-result'>{result}<span> {result === 1 ? singular : plural}</span></p>
    )
}