import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Risk() {
  const [answers, setAnswers] = useState({
    age: '',
    sex: '',
    skinType: '',
    familyHistory: '',
    moles: '',
    immuneSystem: '',
  });

  const [result, setResult] = useState('');

  const handleChange = (event) => {
    setAnswers({ ...answers, [event.target.name]: event.target.value });
  };

  const isFormComplete =
    answers.age &&
    answers.sex &&
    answers.skinType &&
    answers.familyHistory &&
    answers.moles &&
    answers.immuneSystem;

  const handleSubmit = () => {
    if (isFormComplete) {
      let totalPoints = 0;

      // Age Points
      const agePoints = {
        "Under 30 years": 0,
        "30-50 years": 1,
        "51-65 years": 2,
        "Over 65 years": 3,
      };
      totalPoints += agePoints[answers.age] || 0;

      // Gender Points
      const genderPoints = {
        "Male": 1,
        "Female": 0,
      };
      totalPoints += genderPoints[answers.sex] || 0;

      // Skin Type Points
      const skinTypePoints = {
        "Dark skin": 0,
        "Medium skin": 1,
        "Fair skin": 2,
        "Very fair skin": 3,
      };
      totalPoints += skinTypePoints[answers.skinType] || 0;

      // Family Medical History Points
      const familyHistoryPoints = {
        "No family history of skin cancer": 0,
        "One family member with skin cancer": 1,
        "Multiple family members with skin cancer": 2,
      };
      totalPoints += familyHistoryPoints[answers.familyHistory] || 0;

      // Moles or Lesions Points
      const molesPoints = {
        "No moles or lesions": 0,
        "Few common moles": 1,
        "Several atypical moles": 2,
        "Suspicious moles (moles that changes in size/shape)": 3,
      };
      totalPoints += molesPoints[answers.moles] || 0;

      // Immune System Points
      const immuneSystemPoints = {
        "Healthy immune system": 0,
        "Mildly compromised immune system": 1,
        "Severely compromised immune system": 2,
      };
      totalPoints += immuneSystemPoints[answers.immuneSystem] || 0;

      // Determine Risk Level
      let riskLevel = "low risk";
      if (totalPoints >= 8) {
        riskLevel = "high risk";
      } else if (totalPoints >= 5) {
        riskLevel = "medium risk";
      }

      setResult(
        <>
          Your responses indicate a <span style={styles.riskLevel}>{riskLevel}</span> of developing skin cancer.
          <span
            style={styles.retakeTest}
            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            onClick={() => window.location.reload()}
          >
            Retake test
          </span>
        </>
      );
    }
  };

  return (
    <>
      <Header />
      <div style={styles.container}>
        <h1 style={styles.title}>Skin Cancer Risk Assessment</h1>
        <p style={styles.subtitle}>Please answer all the following questions.</p>

        <form style={styles.grid}>
          {/* Questions in 3x2 Grid */}
          {questions.map((q, index) => (
            <div key={index} style={styles.questionBlock}>
              <p style={styles.questionText}>{q.text}</p>
              <div style={styles.optionsContainer}>
                {q.options.map((option) => (
                  <label key={option} style={styles.label}>
                    <input
                      type="radio"
                      name={q.name}
                      value={option}
                      onChange={handleChange}
                      style={{
                        ...styles.radio,
                        ...(answers[q.name] === option ? styles.radioChecked : {}),
                      }}
                    /> {option}


                  </label>
                ))}
              </div>
            </div>
          ))}
        </form>

        <button
          type="button"
          style={{
            ...styles.button,
            opacity: isFormComplete ? '1' : '0.5', // Opacity changes based on form completion
            cursor: isFormComplete ? 'pointer' : 'not-allowed', // Prevent clicking when incomplete
          }}
          onMouseEnter={(e) => {
            if (isFormComplete) e.target.style.opacity = '0.7'; // Hover effect only if enabled
          }}
          onMouseLeave={(e) => {
            if (isFormComplete) e.target.style.opacity = '1'; // Reset opacity on mouse leave
          }}
          onClick={handleSubmit}
          disabled={!isFormComplete} // Button disabled until all answers are filled
        >
          See results
        </button>

        {/* Result Section */}
        {result && <p style={styles.result}>{result}</p>}
      </div>
      <Footer />
    </>
  );
}

// Questions Array
const questions = [
  { name: 'age', text: '1. What is your age?', options: ['Under 30 years', '30-50 years', '51-65 years', 'Over 65 years'] },
  { name: 'sex', text: '2. What is your biological sex?', options: ['Male', 'Female'] },
  { name: 'skinType', text: '3. What is your skin type?', options: ['Dark skin', 'Medium skin', 'Fair skin', 'Very fair skin'] },
  { name: 'familyHistory', text: '4. What is your family medical history?', options: ['No family history of skin cancer', 'One family member with skin cancer', 'Multiple family members with skin cancer'] },
  { name: 'moles', text: '5. Do you have any presence of moles or lesions?', options: ['No moles or lesions', 'Few common moles', 'Several atypical moles', 'Suspicious moles (moles that changes in size/shape)'] },
  { name: 'immuneSystem', text: '6. How is your immune system?', options: ['Healthy immune system', 'Mildly compromised immune', 'Severely compromised immune system'] },
];

const styles = {
  container: {
    maxWidth: 'auto',
    margin: 'auto',
    padding: '30px 50px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: 'black',
    marginTop: '100px',
    marginBottom: '-5px',
  },
  subtitle: {
    fontSize: '13px',
    fontStyle: 'italic',
    color: '#B12E34',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.0fr 1.25fr 0.95fr',
    columnGap: '40px', 
    rowGap: '10px', 
    justifyContent: 'center',
    textAlign: 'left',
    padding: '12px 50px 0px 50px',
    color: 'black',
  },
  questionBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '20px 0',
    minWidth: '250px',
  },
  questionText: {
    fontSize: '13px',
    fontWeight: '600', 
    flexWrap: 'nowrap',  // Prevent wrapping
    textAlign: 'left',
    marginBottom: '10px',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px', // Spacing between options
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'black',
    fontSize: '13px',
    cursor: 'pointer',
  },
  radio: {
    width: '17px',
    height: '17px',
    appearance: 'none',
    border: '2px solid #E2E8F0', 
    borderRadius: '50%',
    backgroundColor: 'white', 
    position: 'relative',
    cursor: 'pointer',
    outline: 'none',
  },
  radioChecked: {
    border: '5.5px solid #B12E34', 
    backgroundColor: 'white', 
  },
  button: {
    backgroundColor: '#B12E34',
    color: 'white',
    fontSize: '15px',
    fontWeight: '600',
    padding: '15px 25px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    marginTop: '8px',
    marginBottom: '10px',
    transition: 'opacity 0.3s ease',
  },
  result: {
    fontSize: '16px',
    color: 'black',
    marginTop: '20px',
  },
  riskLevel: {
    fontSize: '22px',  
    fontWeight: 'bold',
    color: '#B12E34',
  },
  retakeTest: {
    marginLeft: '5px',
    textDecoration: 'underline',
    color: '#B12E34',
    cursor: 'pointer',
  }

};

export default Risk;