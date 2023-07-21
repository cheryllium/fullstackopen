const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  const total = parts.reduce((acc, part) => part.exercises + acc, 0)

  return <p><b>total of {total} exercises</b></p>
}

const Part = ({ name, exercises }) => 
  <p>
    {name} {exercises}
  </p>

const Content = ({ parts }) => (
  <>
    {parts.map(
      part => <Part
                name={part.name}
                exercises={part.exercises}
                key={part.id}
              />
    )}
  </>
)

const Course = ({ course }) => (
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
)

export default Course
