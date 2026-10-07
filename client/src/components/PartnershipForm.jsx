import {useState} from 'react'

const PartnershipForm = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        frequency: '',
        amount: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit =  async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/partnership`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)

            });

            if (response.ok) {
                const data = await response.json()
                console.log('success:', data);
            } else {
                console.error('server error: ', response.statusText)

            }

        } catch (err) {
            console.error('server error: ', err)
        }
    }

  return (
    <>
        <form action="" method="post" onSubmit={handleSubmit}>
            <input type="text" name="full_name" onChange={handleChange} placeholder='ennter full name' value={formData.full_name} required />
            <input type="email" name="email" onChange={handleChange} placeholder='email' value={formData.email} required />
            <select name="frequency" onChange={handleChange} value={formData.frequency} required>
                <option value="">Select one</option>
                <option value="daily">daily</option>
                <option value="weekly">weekly</option>
                <option value="monthly">monthly</option>
                <option value="yearly">yearly</option>
            </select>
            <input type="number" name="amount" min="0.00" step="0.01" placeholder="0.00" required onChange={handleChange} value={formData.amount}
            />

            <input type="submit" value="submit" />
        </form>
    </>
  )
}

export default PartnershipForm