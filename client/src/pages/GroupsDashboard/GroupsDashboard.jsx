import "./GroupsDashboard.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, MenuItem, Select, Stack } from "@mui/material";

import SingleEvent from "./SingleEvent/SingleEvent";
import CreateEventModal from "./CreateEventModal/CreateEventModal";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";
import Panel from "../../components/Panel/Panel";

const GroupsDashboard = ({ themeMode }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [createEventModalOpen, setCreateEventModalOpen] = useState(false);
    const [groupsFilterValue, setgroupsFilterValue] = useState("Home");

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarOptions, setSnackbarOptions] = useState({});

    const [groups, setgroups] = useState([]);
    const [filteredgroups, setFilteredgroups] = useState(groups || []);

    useEffect(() => {
        // Fetch initial groups from db
        fetch("http://localhost:9000/api/groups")
            .then((res) => res.json())
            .then((res) => {
                setgroups(res.data);
            });
    }, []);

    const handleCreateEventClose = () => {
        setCreateEventModalOpen(false);
    };

    const handleCreateEventClicked = () => {
        setCreateEventModalOpen(true);
    };

    const handleEventFilterClicked = (event) => {
        const eventFilterValue = event.target.value;
        setgroupsFilterValue(eventFilterValue);

        if (eventFilterValue === "Home") {
            setFilteredgroups(groups);
        } else {
            const filteredgroups = groups.filter((event) => {
                return event.attendance === eventFilterValue;
            });
            setFilteredgroups(filteredgroups);
        }
    };

    useEffect(() => {
        if (groupsFilterValue === "Home") {
            setFilteredgroups(groups.reverse());
        } else {
            const filteredgroups = groups.filter((event) => {
                return event.attendance === groupsFilterValue;
            });
            setFilteredgroups(filteredgroups);
        }
    }, [groups, groupsFilterValue]);

    return (
        <>
            <CustomSnackbar
                message={snackbarOptions.message}
                vertical={"top"}
                horizontal={"center"}
                alert={true}
                severity={snackbarOptions.severity}
                open={openSnackbar}
                setOpen={setOpenSnackbar}
            />

            <CreateEventModal
                isOpen={createEventModalOpen}
                handleClose={handleCreateEventClose}
                groups={groups}
                setgroups={setgroups}
                themeMode={themeMode}
                setSnackbarOptions={setSnackbarOptions}
                setOpenSnackbar={setOpenSnackbar}
            />

            {isOpen && (
                <Panel
                    themeMode={themeMode}
                    titleHeading="Your groups"
                    contentHeading="groups"
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    dataTestId="groups-component"
                >
                    <Box className={`groups__content ${themeMode}`}>
                        <Box className={`groups__button-panel`}>
                            <Button
                                variant="contained"
                                onClick={handleCreateEventClicked}
                                className={`groups__creat-event-button ${themeMode}`}
                                data-testid="create-event-button"
                            >
                                Create new event
                            </Button>

                            <Select
                                id="attendance-filter"
                                data-testid="attendance-filter"
                                className={`groups__attendance-filter ${themeMode}`}
                                value={groupsFilterValue}
                                onChange={handleEventFilterClicked}
                            >
                                <MenuItem value={"Home"}>Home</MenuItem>
                                <MenuItem value={"Going"}>Going</MenuItem>
                                <MenuItem value={"Interested"}>
                                    Interested
                                </MenuItem>
                                <MenuItem value={"Not Going"}>
                                    Not Going
                                </MenuItem>
                            </Select>
                        </Box>

                        <Stack
                            spacing={2}
                            className={`groups__stack ${themeMode}`}
                        >
                            {filteredgroups.map((event, i) => {
                                return (
                                    <SingleEvent
                                        themeMode={themeMode}
                                        key={i}
                                        eventKey={i}
                                        eventData={event}
                                        groups={groups}
                                        setgroups={setgroups}
                                        setSnackbarOptions={setSnackbarOptions}
                                        setOpenSnackbar={setOpenSnackbar}
                                    />
                                );
                            })}
                        </Stack>
                    </Box>
                </Panel>
            )}
        </>
    );
};

GroupsDashboard.propTypes = {
    themeMode: PropTypes.string,
};

export default GroupsDashboard;
