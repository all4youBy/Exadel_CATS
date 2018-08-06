package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.controllers.requests.*;
import com.exadel.team3.backend.dto.JSONAnswerDTO;
import com.exadel.team3.backend.entities.*;
import com.exadel.team3.backend.security.SecurityUtils;
import com.exadel.team3.backend.security.annotations.AdminAccess;
import com.exadel.team3.backend.security.annotations.AdminAndTeacherAccess;
import com.exadel.team3.backend.security.annotations.UserAccess;

import com.exadel.team3.backend.services.SolutionService;
import com.exadel.team3.backend.services.TestService;
import com.exadel.team3.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collection;
import java.util.List;
import java.util.function.Function;
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private SolutionService solutionService;

    @Autowired
    private SecurityUtils securityUtils;

    @Autowired
    private TestService testService;

    @GetMapping(value = "/find-by-group")
    @AdminAndTeacherAccess
    public List<User> getUsers(@RequestParam(value = "group") String group){
        return userService.getByGroup(group);
    }

    @GetMapping(value = "/groups",produces = MediaType.APPLICATION_JSON_VALUE)
    @AdminAndTeacherAccess
    public ResponseEntity<?> getGroups(){
        List<String> groups = userService.getGroups();
        return groups == null?
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new JSONAnswerDTO("Can't get groups.")):
                ResponseEntity.ok().body(groups);
    }

    @GetMapping(value = "/assigned-solutions/{assignedTo}",produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN') or #assignedTo==authentication.name")
    public ResponseEntity<?> getAssignedSolutions(@PathVariable String assignedTo){
        return getResponse(assignedTo,solutionService::getAssignedItems);
    }

    @GetMapping(value = "/assigned-solutions-finished/{assignedTo}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAssignedSolutionsFinished(@PathVariable String assignedTo){
        return getResponse(assignedTo, solutionService::getAssignedItemsFinished);
    }

    @GetMapping(value = "/assigned-solutions-unfinished/{assignedTo}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAssignedSolutionsUnfinished(@PathVariable String assignedTo){
        return getResponse(assignedTo,solutionService::getAssignedItemsUnfinished);
    }

    @GetMapping(value = "/assigned-tests/{assignedTo}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAssignedTests(@PathVariable String assignedTo){
        return getResponse(assignedTo,testService::getAssignedItems);
    }
    @GetMapping(value = "/assigned-tests-finished/{assignedTo}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAssignedTestsFinished(@PathVariable String assignedTo){
        return getResponse(assignedTo,testService::getAssignedItemsFinished);
    }

    @GetMapping("/assigned-tests-unfinished/{assignedTo}")
    public ResponseEntity<?> getAssignedTestsUnfinished(@PathVariable String assignedTo){
        return getResponse(assignedTo,testService::getAssignedItemsUnfinished);
    }

    @GetMapping(value = "/assigned-tests-group/{assignedToGroup}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAssignedTestsToGroup(@PathVariable String assignedToGroup){
        return getResponse(assignedToGroup,testService::getAssignedItemsToGroup);
    }

    @GetMapping(value = "/assigned-tests-group-finished",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAssignedTestsToGroupFinished(@PathVariable String assignedToGroup){
        return getResponse(assignedToGroup,testService::getAssignedItemsToGroupFinished);
    }

    @GetMapping(value = "/assigned-tests-group-unfinished",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAssignedTestsToGroupUnfinished(@PathVariable String assignedToGroup){
        return getResponse(assignedToGroup,testService::getAssignedItemsToGroupUnfinished);
    }

//    @GetMapping("/assigned-tests-")
//    public ResponseEntity<?> getAssignedItemsWithTopics(String assignedTo){
//        return getResponse(assignedTo,testService::getAssignedItems)
//    }

    @GetMapping("/groups/{email}")
    public ResponseEntity<?> getUserGroups(@PathVariable String email){
        User user = userService.getItem(email);
        Collection<String> groups = user.getGroups();
        return ResponseEntity.ok().body(groups);
    }


    @PutMapping(value = "/change-password",produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ADMIN') or #request.email==authentication.name")
    public ResponseEntity<?> changeUserPassword(@RequestBody ChangePasswordRequest request){
        User user = userService.getItem(request.getEmail());

        if(securityUtils.getEncoder().matches(request.getOldPassword(),user.getPasswordHash())) {
            user.setPasswordHash(securityUtils.getEncoder().encode(request.getNewPassword()));
            userService.updateItem(user);
        }
        else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new JSONAnswerDTO("Old password doesn't match."));

        return ResponseEntity.ok().body(new JSONAnswerDTO("Password changed."));
    }

    @GetMapping("/institutions")
    @AdminAndTeacherAccess
    public ResponseEntity<?> getInstitutions(){
        List<String> institutions = userService.getInstitutions();

        return institutions == null?
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new JSONAnswerDTO("Can't get institutions.")):
                ResponseEntity.ok().body(institutions);
    }

    @PutMapping(value = "/groups",produces = MediaType.APPLICATION_JSON_VALUE)
    @AdminAccess
    public ResponseEntity<?> renameGroup(@RequestBody RenameGroupRequest request,Principal principal){
        userService.renameGroup(request.getUsersId(),principal.getName(),request.getOldGroup(),request.getNewGroup());
        return ResponseEntity.ok(String.format("Group %s renamed to %s",request.getOldGroup(),request.getNewGroup()));
    }

    @DeleteMapping(value = "/groups", produces = MediaType.APPLICATION_JSON_VALUE)
    @AdminAndTeacherAccess
    public ResponseEntity<?> deleteGroup(@RequestBody RemoveGroupRequest request,Principal principal){
        userService.removeGroup(request.getUserId(),principal.getName(),request.getGroup());
        return ResponseEntity.ok(String.format("Group %s removed.",request.getGroup()));
    }

    @GetMapping
    @AdminAccess
    public List<User> getAllUsers(){
        return userService.getItems();
    }

    @GetMapping("/students")
    @AdminAndTeacherAccess
    public List<User> getAllStudents(){
        return userService.getByRole(UserRole.STUDENT);
    }

    @GetMapping("/teachers")
    @AdminAccess
    public List<User> getAllTeachers(){

        return userService.getByRole(UserRole.TEACHER);
    }

    @GetMapping("/admins")
    public List<User> getAllAdmins(){
        return userService.getByRole(UserRole.ADMIN);
    }

    @GetMapping("/{email}")
    @PreAuthorize("hasRole('ADMIN') or #email==authentication.name")
    public User getUser(@PathVariable(value = "email") String email){
        return userService.getItem(email);
    }


    @PutMapping(
            value = "/update-rights",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @AdminAccess
    public ResponseEntity<?> updateUserRights(@RequestBody UpdateUserRightsRequest request){
        User user = userService.getItem(request.getEmail());
        if(user == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new JSONAnswerDTO("Can't find user with email:"+request.getEmail()));

        user.setRole(request.getUserRole());
        userService.updateItem(user);
        return ResponseEntity.ok().body(new JSONAnswerDTO("User rights increased to:"+request.getUserRole()));
    }

    @GetMapping("/confirm-users")
    @AdminAccess
    public ResponseEntity<?> getListOfUnconfirmedUsers(){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getByRole(UserRole.TEACHER_UNCONFIRMED));
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @UserAccess
    public ResponseEntity<?> updateUser(@RequestBody UserUpdateRequest request){
        User user = userService.getItem(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        if(request.getUserAffiliation() !=null)
             user.setAffiliation(request.getUserAffiliation());
        userService.updateItem(user);

        return ResponseEntity.ok(user);
    }

    @PutMapping("/groups/delete-user-from-group")
    @AdminAndTeacherAccess
    public ResponseEntity<?> deleteUserFromGroup(@RequestBody DeleteUserFromGroupRequest request) {
        User user = userService.getItem(request.getUserId());

        if(user == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new JSONAnswerDTO(String.format("Can't find user %s",request.getUserId())));

        if (user.getGroups().remove(request.getGroup())) {
            userService.updateItem(user);
            return ResponseEntity.ok().body(new JSONAnswerDTO(String.format("User %s successfully deleted from %s", request.getUserId(), request.getGroup())));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new JSONAnswerDTO(String.format("User wasn't deleted from group %s. Check group name and try again.",request.getGroup())));
    }

    @DeleteMapping
    @AdminAccess
    public void deleteUser(@RequestBody User user){
        userService.deleteItem(user);
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @AdminAndTeacherAccess
    public ResponseEntity<?> assignGroup(@RequestBody AssignGroupRequest request, Principal principal) {
        userService.assignGroup(request.getEmails(),principal.getName(), request.getGroupId());
        return ResponseEntity.ok(HttpStatus.OK);
    }

    private <T,R> ResponseEntity<?> getResponse(T condition,Function<T,List<R>> resolver){
        List<R> items = resolver.apply(condition);

        return items == null? ResponseEntity.status(HttpStatus.NO_CONTENT).body(new JSONAnswerDTO(String.format("Can't find items assigned to %s",condition))):
                ResponseEntity.ok().body(items);
    }

}
