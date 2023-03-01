package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Controller
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;
    private final RoleRepository roleRepository;

    public AdminController(UserService userService, RoleService roleService, RoleRepository roleRepository) {
        this.userService = userService;
        this.roleService = roleService;
        this.roleRepository = roleRepository;
    }

    @GetMapping("admin")
    public String viewUsers(ModelMap model, Principal principal) {
        model.addAttribute("allUsers", userService.getAllUsers());
        model.addAttribute("user", userService.loadUserByUsername(principal.getName()));
        model.addAttribute("allRoles", roleService.getAllRoles());

        return "admin";
    }

    @GetMapping("admin/new")
    public String getNewUserForm(ModelMap model, Principal principal) {
        model.addAttribute("admin", userService.loadUserByUsername(principal.getName()));
        model.addAttribute("user", new User());
        model.addAttribute("allRoles", roleService.getAllRoles());

        return "new";
    }

    @PostMapping("admin/new")
    public String addNewUser(@RequestParam("selectedRoles") Long[] rolesId,
                             @ModelAttribute("user") User user) {

        List<Role> roles = new ArrayList<>();
        for (Long roleId : rolesId) {
            roles.add(roleRepository.getById(roleId));
        }

        user.setRoles(roles);
        userService.saveUser(user);

        return "redirect:/admin";
    }

    @GetMapping("/admin/{id}")
    public String getFormUserUpdate(ModelMap model, @PathVariable("id") Long id) {
        model.addAttribute("user", userService.getUserById(id));
        model.addAttribute("allRoles", roleService.getAllRoles());

        return "admin";
    }

    @PatchMapping("/admin/{id}")
    public String updateUser(@PathVariable("id") long id, @ModelAttribute("user") User user) {
        userService.updateUser(id, user);
        return "redirect:/admin";
    }

    @DeleteMapping("/admin/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }

    @GetMapping( "/admin/adminUser")
    public String userPage(ModelMap model, Principal principal) {
        model.addAttribute("users", userService.loadUserByUsername(principal.getName()));
        return "adminUser";
    }
}
