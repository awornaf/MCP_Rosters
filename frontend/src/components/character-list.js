import React, {useState, useEffect} from "react";
import CharacterDataService from "../services/character.js";
import { DropdownButton, Dropdown, InputGroup, FormControl } from "react-bootstrap";
import PaginationBasic from "./pagination.js";


const CharacterList = props => {
  const [characters, setCharacters] = useState([]);
  const [searchBy = "name", setSearchBy] = useState("name");
  const [searchValue, setSearchValue ] = useState("");
  const [pages, setPages] = useState();

    useEffect(() => {
      retrieveCharacters();
    }, []);

    const onChangeSearchValue = (e) => {
      const searchValue = e.target.value;
      setSearchValue(searchValue);
    }

    const retrieveCharacters = () => {
      CharacterDataService.getAll()
        .then(response => {
          console.log(response.data);
          setCharacters(response.data.characters);
          if (response.data.total_results < response.data.entries_per_page){
            setPages(1);
          } else {
          setPages((response.data.total_results / response.data.entries_per_page)+1);
          }
          console.log(pages);
        })
        .catch(e => {
          console.log(e);
        });
    };

    const refreshList = () => {
      retrieveCharacters();
    };

    const find = (query, by) => {
      CharacterDataService.find(query, by)
        .then(response => {
          console.log(response.data);
          setCharacters(response.data.characters);
          if (response.data.total_results < response.data.entries_per_page){
            setPages(1);
          } else {
          setPages((response.data.total_results / response.data.entries_per_page)+1);
          }
          console.log(pages);
        })
        .catch(e => {
          console.log(e);
        });
    };
    
    const affList = (character) => {
      let affListing="";
      if(character.affiliations.length > 0){
        for (let i=0; i< character.affiliations.length;i++) {
          if( (i+1) === character.affiliations.length) {
            affListing += character.affiliations[i];
          } else {
            affListing += character.affiliations[i] + ", ";
          }
        }
      }
      return affListing;
    }
    
    const handleSearchSelect = (e) => {
      setSearchBy(e);
    };

    const doSearch = () => {
      find(searchValue, searchBy);
    }

    return (
      <div>
        <div className="row pd-1">
          <div className="input-group col-lg-4">
            <InputGroup className="mb-30">
              <DropdownButton 
                id="dropdown-basic-button" 
                title={`Search by ${searchBy}`}
                onSelect={handleSearchSelect}>
                <Dropdown.Item eventKey="name">Name</Dropdown.Item>
                <Dropdown.Item eventKey="alias">Alias</Dropdown.Item>
                <Dropdown.Item eventKey="threat">Threat</Dropdown.Item>
                <Dropdown.Item eventKey="affiliation">Affiliation</Dropdown.Item>
              </DropdownButton>
              <FormControl
                placeholder="Enter search criteria"
                aria-label="Enter search criteria"
                aria-describedby="basic-addon1"
                value={searchValue}
                onChange={onChangeSearchValue}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={doSearch}
              >
                Search
              </button>
            </InputGroup>
          </div>
          
        <div className="row">
          {characters.map((character) => {
            return (
              <div className="col-lg-4 pb-1">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{character.name}</h5>
                    <p className="card-text">
                      <strong>Alias: </strong>{character.alias}<br/>
                      <strong>Threat: </strong>{character.threat}<br/>
                      <strong>Affiliations: </strong>{affList(character)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <PaginationBasic page_max={pages}></PaginationBasic>
      </div>
      </div>
    );
}

export default CharacterList;