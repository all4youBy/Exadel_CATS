package com.exadel.team3.backend.controllers;

import com.exadel.team3.backend.controllers.requests.AssignGroupRequest;
import com.exadel.team3.backend.controllers.requests.UpdateUserRightsRequest;
import com.exadel.team3.backend.entities.User;
import com.exadel.team3.backend.entities.UserRole;
import com.exadel.team3.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/find-by-group")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<User> getUsers(@RequestParam(value = "group") String group){
        return userService.getByGroup(group);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers(){
        return userService.getItems();
    }

    @GetMapping("/students")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public List<User> getAllStudents(){
        return userService.getUsersByRole(UserRole.STUDENT);
    }

    @GetMapping("/teachers")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllTeachers(){
        return userService.getUsersByRole(UserRole.TEACHER);
    }

    @GetMapping("/admins")
    public List<User> getAllAdmins(){
        return userService.getUsersByRole(UserRole.ADMIN);
    }

    @GetMapping("/{email}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER') or #email == authentication.name")
    public User getUser(@PathVariable(value = "email") String email){
        return userService.getItem(email);
    }

    @PutMapping(value = "/update-rights", consumes = "application/json")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUserRights(@RequestBody UpdateUserRightsRequest request){
       User user = userService.getItem(request.getEmail());
       if(user == null)
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Can't find user with email:"+request.getEmail());

       user.setRole(request.getUserRole());
       userService.updateItem(user);
       return ResponseEntity.ok().body("User rights increased to:"+request.getUserRole());
    }

    @GetMapping("/confirm-users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getListOfUnconfirmedUsers(){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUsersByRole(UserRole.TEACHER_UNCONFIRMED));
    }

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUser(@RequestBody User user){
        userService.updateItem(user);
        return new ResponseEntity<String>(HttpStatus.OK);
    }

    @DeleteMapping
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@RequestBody User user){
        userService.deleteItem(user);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<?> assignGroup(@RequestBody AssignGroupRequest request){
        userService.assignGroup(request.getEmails(),request.getGroupId());
        return new ResponseEntity<String>(HttpStatus.OK);
    }

//    @PostMapping
//    public ResponseEntity<?> testRequest(@RequestBody )
}
