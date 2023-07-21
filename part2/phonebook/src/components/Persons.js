const Persons = ({ persons, filter, handleDelete }) => (
  <>
    {persons
     .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
     .map(person => (
       <span key={person.name}>
         {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>delete</button>
         <br />
       </span>
     ))}
  </>
)

export default Persons
