import React, { useState } from 'react'
import { Button, ButtonGroup, FormControlLabel, IconButton, ListItem, ListItemText, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import "./List.css"

function List() {

    let [newItem, setNewItem] = useState("")
    let [inputSuggestions, setInputSuggestions] = useState([])
    let [items, setItems] = useState([])

    const suggestions = ["atta", "rice", "salt", "sugar", "vim", "chips", "juice"]

    const inputChange = (e) => {
        setNewItem(e.target.value)
        if (e.target.value === "") {
            setInputSuggestions([])
            return
        }
        let filteredSuggestions = suggestions.filter(suggestion => suggestion.includes(e.target.value.toLowerCase()))
        setInputSuggestions(filteredSuggestions)
    }

    const selectSuggestion = (e, suggestion) => {
        setNewItem(suggestion)
        setInputSuggestions([])
    }

    const addItem = () => {
        if (newItem === "") return
        const itemObject = {
            name: newItem,
            isChecked: false
        }
        setItems([itemObject, ...items])
        setNewItem("")
        setInputSuggestions([])
    }

    const deleteItem = (item) => {
        const filtered = items.filter((stateItem) => stateItem !== item)
        setItems(filtered)
    }

    const handleCheck = (e, item, index) => {
        let tempItems = [...items]
        tempItems[index].isChecked = !item.isChecked
        setItems(tempItems)
    }

    return (
        <section>
            <div className="inputContainer">
                <ButtonGroup color="secondary" aria-label="outlined secondary button group">
                    <TextField id="outlined-basic" label="Add Item" variant="outlined" value={newItem} onChange={inputChange} autoComplete="off" />
                    <Button variant="contained" onClick={addItem}>ADD</Button>
                </ButtonGroup>
                {inputSuggestions.length > 0 ? (
                    <div className="listContainer">
                        {inputSuggestions.map(suggestion => (
                            <ListItem button onClick={(e) => selectSuggestion(e, suggestion)} className="list">
                                <ListItemText primary={suggestion} />
                            </ListItem>
                        ))}
                    </div>
                ) : null}
            </div>
            <div className="container">
                {items.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell>Item</TableCell>
                                    <TableCell>Remove</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item, index) => (
                                    <TableRow key={item.name}>
                                        <TableCell align="center" component="th" scope="row">
                                            <FormControlLabel
                                                control={<Switch name={item.name} checked={item.isChecked} onClick={(e) => handleCheck(e, item, index)} />}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <a href={`https://www.amazon.in/s?k=${item.name}`} target="_blank" rel="noreferrer">{item.name}</a>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton color="secondary" aria-label="remove">
                                                <Delete onClick={() => deleteItem(item)} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <h2>Nothing To Order</h2>
                )}
            </div>
        </section >
    )
}

export default List


