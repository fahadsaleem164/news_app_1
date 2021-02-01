import styles from '../styles/EOM.module.css'
import {Toolbar} from '../components/toolbar'

const EOM  = (employees) => {
        console.log(employees.employees.name)
    return (
        <div className='page-container'>
            <Toolbar/>
          <div className={styles.main}>
                <h1>Employee of the month</h1>
                <div className={styles.employeeOfTheMonth}>
                    <h3>{employees.employees.name}</h3>
                    <h6>{employees.employees.position}</h6>
                    <img src={employees.employees.image} />
                    <p>{employees.employees.description}</p>
                </div>
            </div>
        </div>
    )
  }

export const getServerSideProps = async pageContext => {
    const apiResponse = await fetch('https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth')
    const employees = await apiResponse.json()
   
    return {
        props: {
            employees
        }
    }
}


  export default EOM
