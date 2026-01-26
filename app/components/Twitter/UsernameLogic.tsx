"use client"
import React, { useState } from 'react'
import AccountInput from './AccountInput'

const UsernameLogic = () => {
  const [users, setUsers] = useState<string[]>([]);
  return (
    <div>
      <AccountInput value={users} onChange={setUsers}/>
    </div>
  )
}

export default UsernameLogic