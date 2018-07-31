package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.controllers.requests.AssignGroupRequest;
import com.exadel.team3.backend.controllers.requests.RemoveGroupRequest;
import com.exadel.team3.backend.controllers.requests.RenameGroupRequest;
import com.exadel.team3.backend.controllers.requests.UpdateUserRightsRequest;
import com.exadel.team3.backend.entities.User;
import com.exadel.team3.backend.entities.UserRole;
import com.exadel.team3.backend.security.annotations.AdminAccess;
import com.exadel.team3.backend.security.annotations.AdminAndTeacherAccess;
import com.exadel.team3.backend.security.annotations.UserAccess;
import com.exadel.team3.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

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
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't get groups."):
                ResponseEntity.ok().body(groups);
    }

    @GetMapping("/institutions")
    @AdminAndTeacherAccess
    public ResponseEntity<?> getInstitutions(){
        List<String> institutions = userService.getInstitutions();

        return institutions == null?
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't get institutions."):
                ResponseEntity.ok().body(institutions);
    }

    @PutMapping(value = "/groups",produces = MediaType.APPLICATION_JSON_VALUE)
    @AdminAccess
    public ResponseEntity<?> renameGroup(@RequestBody RenameGroupRequest request){
        userService.renameGroup(request.getUsersId(),request.getOldGroup(),request.getNewGroup());
        return ResponseEntity.ok(String.format("Group %s renamed to %s",request.getOldGroup(),request.getNewGroup()));
    }

    @DeleteMapping(value = "/groups", produces = MediaType.APPLICATION_JSON_VALUE)
    @AdminAccess
    public ResponseEntity<?> deleteGroup(@RequestBody RemoveGroupRequest request){
        userService.removeGroup(request.getUserId(),request.getGroup());
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
    @UserAccess
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
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Can't find user with email:"+request.getEmail());

       user.setRole(request.getUserRole());
       userService.updateItem(user);
       return ResponseEntity.ok().body("User rights increased to:"+request.getUserRole());
    }

    @GetMapping("/confirm-users")
    @AdminAccess
    public ResponseEntity<?> getListOfUnconfirmedUsers(){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getByRole(UserRole.TEACHER_UNCONFIRMED));
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @AdminAccess
    public ResponseEntity<?> updateUser(@RequestBody User user){
        userService.updateItem(user);
        return new ResponseEntity<String>(HttpStatus.OK);
    }

    @DeleteMapping
    @AdminAccess
    public void deleteUser(@RequestBody User user){
        userService.deleteItem(user);
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @AdminAndTeacherAccess
    public ResponseEntity<?> assignGroup(@RequestBody AssignGroupRequest request) {
        userService.assignGroup(request.getEmails(), request.getGroupId());
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
