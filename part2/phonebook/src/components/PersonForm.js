const PersonForm = ({ name, handleNameChange, number, handleNumberChange, handleAddPerson }) => (
  <form>
    <div>
      name: <input value={name} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={number} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit" onClick={handleAddPerson}>add</button>
    </div>
  </form>
)

export default PersonForm
